import { NextResponse } from 'next/server'
import { addUserToRoomByInvitationCode } from '@/utils/rooms'

export async function GET(req, { params }) {
    const token = params.token

    if (typeof token !== 'string') {
        return NextResponse.redirect(new URL('/?error=invalid_token', req.url))
    }

    try {
        const success = await addUserToRoomByInvitationCode(token)
        if (!success) throw new Error('Fallo al unirse')

        sessionStorage.removeItem("cachedRooms")

        return NextResponse.redirect(new URL('/habits', req.url))
    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL('/?error=join_failed', req.url))
    }
}
