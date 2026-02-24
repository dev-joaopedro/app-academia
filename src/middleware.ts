import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userRole = request.cookies.get("app-user-role")?.value;

    // 1. Redirecionar Rota Raiz para Login (Desejo do Usuário)
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // 2. Proteção de Rotas Privadas
    const isPrivatePage = pathname.startsWith("/student") || pathname.startsWith("/trainer");
    const isAuthPage = pathname.startsWith("/auth");

    if (isPrivatePage && !userRole) {
        // Se tentar acessar página privada sem login, vai para o login
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAuthPage && userRole) {
        // Se já estiver logado e tentar ir para o login/registro, vai para o dashboard correto
        const dashboard = userRole === "trainer" ? "/trainer/dashboard" : "/student/dashboard";
        return NextResponse.redirect(new URL(dashboard, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
