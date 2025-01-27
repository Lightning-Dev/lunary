import { Context, Next } from "koa"
import { z } from "zod"

export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw("Not Found", 404)
    }
  } catch (error: any) {
    console.error(error)

    if (error instanceof z.ZodError) {
      ctx.status = 422
      ctx.body = error.errors[0]
      return
    }

    ctx.status = error.statusCode || error.status || 500
    ctx.body = {
      message: error.message || "An unexpected error occurred",
    }
  }
}
