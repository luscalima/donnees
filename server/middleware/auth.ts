import { serverSupabaseSession } from '#supabase/server'
import { UnauthorizedError } from '../errors'
import { bypass } from '../utils/bypass'

export default eventHandler(async event => {
  const pass = bypass(event.path, [
    '/',
    '/login',
    /\/confirm.*/,
    /\/api\/_content.*/,
    /\/favicon.*/,
  ])

  if (pass) {
    return
  }

  const session = await serverSupabaseSession(event)

  if (!session) {
    return error(
      new UnauthorizedError('You must be logged in to access this resource'),
    )
  }

  event.context.user = session.user
})
