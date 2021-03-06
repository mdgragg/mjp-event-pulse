export type Email = {
  from?: {
    replyTo: string
    name: string
    email: string
  }
  bodyHTML?: string
  url: string
  templateId?: string
}
