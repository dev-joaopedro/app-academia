import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // Em desenvolvimento sem Supabase, permitir acesso a todas as rotas
    // Quando o Supabase estiver configurado, substituir pelo código abaixo:
    //
    // import { updateSession } from "@/lib/supabase/middleware";
    // return await updateSession(request);

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
