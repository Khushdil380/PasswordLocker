const brandHeader = `
  <div style="text-align:center;padding:28px 0 20px;background:linear-gradient(135deg,#7A2D83,#9F3AAA);">
    <div style="width:48px;height:48px;margin:0 auto 12px;background:rgba(255,255,255,0.15);
      border-radius:12px;display:flex;align-items:center;justify-content:center;">
      <span style="font-size:24px;">🔐</span>
    </div>
    <h2 style="margin:0;font-family:'Roboto Slab',serif;color:#ffffff;font-size:20px;">
      Password Locker
    </h2>
  </div>
`

const wrapper = (content) => `
  <div style="font-family:'Roboto Slab',Georgia,serif;max-width:520px;margin:0 auto;
    background:#ffffff;border-radius:12px;overflow:hidden;
    box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    ${brandHeader}
    <div style="padding:32px;">
      ${content}
    </div>
    <div style="background:#f9f4fa;padding:16px 32px;text-align:center;
      font-size:12px;color:#757575;border-top:1px solid #f3e5f5;">
      © ${new Date().getFullYear()} Password Locker · Secure your digital life
    </div>
  </div>
`

export const otpEmailTemplate = (otp) => wrapper(`
  <h3 style="color:#212121;margin:0 0 8px;font-size:18px;">Verify Your Email</h3>
  <p style="color:#757575;line-height:1.6;margin:0 0 24px;">
    Use the code below to complete your registration. This code expires in 10 minutes.
  </p>
  <div style="text-align:center;padding:24px;background:#f3e5f5;border-radius:12px;
    margin:0 0 24px;">
    <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#9F3AAA;">
      ${otp}
    </span>
  </div>
  <p style="color:#757575;font-size:13px;margin:0;">
    If you didn't request this, please ignore this email.
  </p>
`)

export const passwordChangeOtpTemplate = (otp, purpose) => {
  const title = purpose === 'change-master-password'
    ? 'Change Master Password'
    : purpose === 'change-password'
    ? 'Change Login Password'
    : 'Update Email'

  return wrapper(`
  <h3 style="color:#212121;margin:0 0 8px;font-size:18px;">${title}</h3>
  <p style="color:#757575;line-height:1.6;margin:0 0 24px;">
    You requested to ${title.toLowerCase()}. Use the OTP below to verify your identity. This code expires in 10 minutes.
  </p>
  <div style="text-align:center;padding:24px;background:#f3e5f5;border-radius:12px;
    margin:0 0 24px;">
    <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#9F3AAA;">
      ${otp}
    </span>
  </div>
  <p style="color:#757575;font-size:13px;margin:0;">
    If you didn't initiate this request, please secure your account immediately.
  </p>
`)
}

export const welcomeEmailTemplate = (name) => wrapper(`
  <h3 style="color:#212121;margin:0 0 8px;font-size:18px;">Welcome aboard, ${name}! 🎉</h3>
  <p style="color:#757575;line-height:1.7;margin:0 0 20px;">
    Your Password Locker account is ready. You now have a secure vault to store 
    and manage all your passwords in one place.
  </p>

  <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
    <tr>
      <td style="padding:12px 16px;background:#f9f4fa;border-radius:8px 8px 0 0;
        border-bottom:1px solid #f3e5f5;">
        <span style="font-size:16px;margin-right:8px;">🔐</span>
        <strong style="color:#212121;">Encrypted Storage</strong>
        <p style="color:#757575;font-size:13px;margin:4px 0 0 28px;">
          All passwords are encrypted end-to-end
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;background:#f9f4fa;border-bottom:1px solid #f3e5f5;">
        <span style="font-size:16px;margin-right:8px;">📂</span>
        <strong style="color:#212121;">Smart Categories</strong>
        <p style="color:#757575;font-size:13px;margin:4px 0 0 28px;">
          Organize by Banking, Social, Work & more
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;background:#f9f4fa;border-bottom:1px solid #f3e5f5;">
        <span style="font-size:16px;margin-right:8px;">⚡</span>
        <strong style="color:#212121;">One-Click Access</strong>
        <p style="color:#757575;font-size:13px;margin:4px 0 0 28px;">
          Copy passwords or navigate to sites instantly
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;background:#f9f4fa;border-radius:0 0 8px 8px;">
        <span style="font-size:16px;margin-right:8px;">🛡️</span>
        <strong style="color:#212121;">Auto Logout</strong>
        <p style="color:#757575;font-size:13px;margin:4px 0 0 28px;">
          Sessions expire after 1 hour for safety
        </p>
      </td>
    </tr>
  </table>

  <div style="padding:20px;background:linear-gradient(135deg,#f3e5f5,#fce4ec);
    border-radius:12px;margin:0 0 24px;border-left:4px solid #9F3AAA;">
    <p style="color:#212121;font-weight:600;margin:0 0 6px;font-size:14px;">
      🔑 Your Default Master Password
    </p>
    <p style="color:#9F3AAA;font-size:20px;font-weight:700;letter-spacing:1px;margin:0 0 8px;">
      hello@passwordlocker
    </p>
    <p style="color:#757575;font-size:12px;margin:0;">
      This is required to view your stored passwords. Change it anytime from your profile settings.
    </p>
  </div>

  <div style="text-align:center;">
    <a href="${process.env.CLIENT_URL}" 
       style="display:inline-block;padding:14px 36px;background:#9F3AAA;color:#ffffff;
       text-decoration:none;border-radius:50px;font-weight:600;font-size:15px;">
      Go to Dashboard →
    </a>
  </div>
`)

export const resetPasswordTemplate = (resetLink) => wrapper(`
  <h3 style="color:#212121;margin:0 0 8px;font-size:18px;">Reset Your Password</h3>
  <p style="color:#757575;line-height:1.6;margin:0 0 24px;">
    Click the button below to reset your password. This link expires in 15 minutes.
  </p>
  <div style="text-align:center;margin:0 0 24px;">
    <a href="${resetLink}" 
       style="display:inline-block;padding:14px 36px;background:#9F3AAA;color:#ffffff;
       text-decoration:none;border-radius:50px;font-weight:600;">
      Reset Password
    </a>
  </div>
  <p style="color:#757575;font-size:13px;margin:0;">
    If you didn't request this, please ignore this email.
  </p>
`)
