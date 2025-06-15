'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export default function useRealtimeMessages(roomId) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // 1. Cargar historial con join a user_data
        const loadMessages = async () => {
            const { data, error } = await supabase
                .from("room_messages")
                .select(`
                    id,
                    roomID,
                    senderID,
                    content,
                    created_at,
                    user_data ( username )
                `)
                .eq("roomID", roomId)
                .order("created_at", { ascending: true })

            if (!error && data) {
                const msgs = data.map((m) => ({
                    id: m.id,
                    roomID: m.roomID,
                    senderID: m.senderID,
                    content: m.content,
                    created_at: m.created_at,
                    username: m.user_data?.username || "desconocido",
                }))
                setMessages(msgs)
            }
        }

        loadMessages()

        // 2. Suscribirse a nuevos mensajes
        const channel = supabase
            .channel(`room-${roomId}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "room_messages",
                    filter: `roomID=eq.${roomId}`
                },
                async ({ new: m }) => {
                    const { data: ud } = await supabase
                        .from("user_data")
                        .select("username")
                        .eq("userID", m.senderID)
                        .maybeSingle()

                    const enriched = {
                        ...m,
                        username: ud?.username || "desconocido",
                    }
                    setMessages((prev) => [...prev, enriched])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [roomId])

    return messages
}
