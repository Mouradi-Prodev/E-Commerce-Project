import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from './lib/session'

// 1. Define routes
const adminRoutes = ['/admin','/admin/products','/admin/products/new', '/admin/categories', '/admin/orders', '/admin/products/edit/[id]']
const adminLoginRoute = ['/admin/login']
const publicRoutes = ['/', '/allproducts', '/categories']
const userLoginRoute = ['/login', '/register']
const protectedRoutes = ['/order/validate']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isAdminRoute = (path.startsWith('/admin') && !adminLoginRoute.includes(path)) || adminRoutes.includes(path)
    const isAdminLoginRoute = adminLoginRoute.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const isProtectedRoute = protectedRoutes.includes(path)
    const isUserLoginRoute = userLoginRoute.includes(path)

    // 2. Get the session token from cookies
    const token = req.cookies.get('session')?.value

    let user = null

    if (token) {
        try {
            const session = await fetch('http://localhost:8080/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (session.ok) {
                const data = await session.json()
                user = data?.user ?? null
            }
        } catch (error) {
            console.error('Error fetching user session:', error)
        }
    }

    // 3. Handling route protection
    if (isProtectedRoute) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
    if (isAdminRoute) {
        if (!user) {
            deleteSession()
            return NextResponse.redirect(new URL('/admin/login', req.url))
        }

        if (user.role?.name === "ROLE_ADMIN") {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    if (isAdminLoginRoute && user?.role?.name === "ROLE_ADMIN") {
        return NextResponse.redirect(new URL('/admin', req.url))
    }

    if (isUserLoginRoute && user) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

// Middleware should not run on API, static, or image requests
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
