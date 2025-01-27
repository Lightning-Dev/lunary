import Router from "koa-router"
import orgs from "./orgs"
import datasets from "./datasets"
import evals from "./evals"
import filters from "./filters"
import runs from "./runs/index"
import templateVersions from "./templateVersions"
import templates from "./templates"
import users from "./users"
import projectUsers from "./external-users"
import sql from "@/utils/db"
import projects from "./projects"

const v1 = new Router({
  prefix: "/v1",
})

v1.get("/", async (ctx) => {
  ctx.body = "Lunary API v1"
})

v1.get("/health", async (ctx) => {
  const [testUser] =
    await sql`select * from account where email = 'test@test.com'`

  if (!testUser) {
    ctx.throw(500, "No test user found")
  }
  ctx.body = "Ok"
})

v1.use(orgs.routes())
v1.use(users.routes())
v1.use(projects.routes())
v1.use(runs.routes())
v1.use(datasets.routes())
v1.use(templates.routes())
v1.use(templateVersions.routes())
v1.use(filters.routes())
v1.use(evals.routes())
v1.use(projectUsers.routes())

export default v1
