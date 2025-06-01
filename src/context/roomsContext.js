'use client'

import { addToast } from "@heroui/toast";
import { getAllInfoRoomsWhereUserIsMember, updateRoomInfo } from "@root/utils/rooms";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";

const RoomsContext = createContext({
    rooms: [],
    loading: true,
    fetchRooms: () => { },
    editRoomInfo: () => { },
});

export function RoomsProvider({ children }) {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga desde la base de datos y actualiza cache
    const loadRoomsFromDB = useCallback(async () => {
        console.log("loading rooms from db");
        setLoading(true);
        try {
            const data = await getAllInfoRoomsWhereUserIsMember();
            setRooms(data);
            sessionStorage.setItem("cachedRooms", JSON.stringify(data));
        } catch (error) {
            addToast({
                title: "Error",
                message: "An error occurred while getting the information.",
                type: "danger",
            });
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Edita y luego recarga (forzando desde DB)
    const editRoomInfo = useCallback(
        async (roomId, roomInfo) => {
            try {
                await updateRoomInfo(roomId, roomInfo);
                await fetchRooms(true);
            } catch (error) {
                addToast({
                    title: "Error",
                    message: "An error occurred while updating the room.",
                    type: "danger",
                });
                console.log(error);
            }
        },
        [] // fetchRooms se redefine abajo, así que React infiere que está estable
    );

    // Busca en cache o carga desde DB si force=true o no hay cache
    const fetchRooms = useCallback(
        async (force = false) => {
            if (!force) {
                const cachedRaw = sessionStorage.getItem("cachedRooms");
                if (cachedRaw) {
                    try {
                        const parsed = JSON.parse(cachedRaw);
                        if (Array.isArray(parsed)) {
                            setRooms(parsed);
                            setLoading(false);
                            console.log("Rooms loaded from cache");
                            return;
                        }
                    } catch {
                        // Si no pudo parsear, se ignora y se recarga desde DB
                    }
                }
            }
            await loadRoomsFromDB();
        },
        [loadRoomsFromDB]
    );

    // Carga inicial
    useEffect(() => {
        fetchRooms(false);
    }, [fetchRooms]);

    // Memoizamos el value del contexto
    const contextValue = useMemo(
        () => ({
            rooms,
            loading,
            fetchRooms,
            editRoomInfo,
        }),
        [rooms, loading, fetchRooms, editRoomInfo]
    );

    return (
        <RoomsContext.Provider value={contextValue}>
            {children}
        </RoomsContext.Provider>
    );
}

export function useRooms() {
    const context = useContext(RoomsContext);
    if (!context) {
        throw new Error("useRooms debe usarse dentro de RoomsProvider");
    }
    return context;
}
