'use client'

import { addToast } from "@heroui/toast";
import { getAllInfoRoomsWhereUserIsMember, updateRoomInfo } from "@root/utils/rooms";
import { createContext, useContext, useEffect, useState } from "react";

const RoomsContext = createContext();

export function RoomsProvider({ children }) {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadRoomsFromDB = async () => {
        console.log("loading rooms from db");
        try {
            const data = await getAllInfoRoomsWhereUserIsMember();
            setRooms(data);
            sessionStorage.setItem("cachedRooms", JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            addToast({
                title: 'Error',
                message: "An error occurred while getting the information.",
                type: 'danger',
            })
            setLoading(false);
        }

    };

    const editRoomInfo = async (roomId, roomInfo) => {
        try {
            const data = await updateRoomInfo(roomId, roomInfo);
            await fetchRooms(true);
        } catch (error) {
            throw new Error(error)
        }
    }

    const fetchRooms = async (force) => {

        if (!force) {
            const cached = sessionStorage.getItem("cachedRooms");
            if (cached != [] && cached != null) {
                const parsed = JSON.parse(cached);
                setRooms(parsed);
                setLoading(false);
                console.log("Rooms loaded from cache");
                return;
            }
            else {
                await loadRoomsFromDB()
                return;
            }
        }
        await loadRoomsFromDB();
    };

    useEffect(() => {
        fetchRooms(false);
    }, []);

    return (
        <RoomsContext.Provider
            value={{ rooms, loading, fetchRooms, editRoomInfo }}
        >
            {children}
        </RoomsContext.Provider>
    );
}

export function useRooms() {
    return useContext(RoomsContext);
}
