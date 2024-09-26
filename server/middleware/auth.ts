import { serverSupabaseSession } from '#supabase/server'
import { UnauthorizedError } from '../errors'

export default eventHandler(async event => {
  const session = await serverSupabaseSession(event)

  if (!session) {
    return error(
      new UnauthorizedError('You must be logged in to access this resource'),
    )
  }

  event.context.user = session.user
})
