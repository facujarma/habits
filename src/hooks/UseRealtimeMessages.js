import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

function useRealtimeMessages(roomId) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const channel = supabase
            .channel(`room-${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `roomID=eq.${roomId}`
                },
                (payload) => {
                    setMessages((msgs) => [...msgs, payload.new]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId]);

    return messages;
}
