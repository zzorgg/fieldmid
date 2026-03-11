import emailjs from "@emailjs/browser"

type ContactMessageInput = {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
}

const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

if (publicKey) {
  emailjs.init({ publicKey })
}

export async function submitContactMessage(input: ContactMessageInput) {
  if (!publicKey || !serviceId || !templateId) {
    throw new Error("CONTACT_FORM_UNAVAILABLE")
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        firstName: input.firstName,
        lastName: input.lastName,
        name: `${input.firstName} ${input.lastName}`.trim(),
        email: input.email,
        company: input.company,
        message: input.message,
        time: new Date().toLocaleString(),
      },
      {
        publicKey,
      }
    )
  } catch {
    throw new Error("CONTACT_FORM_SEND_FAILED")
  }
}
