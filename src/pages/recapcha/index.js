// components/Recaptcha.js
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const Recaptcha = ({ onVerify }) => {
  const [recaptchaValue, setRecaptchaValue] = useState(null)

  const handleRecaptchaChange = value => {
    setRecaptchaValue(value)
    onVerify(value) // Callback to parent component with the reCAPTCHA value
  }


  return <ReCAPTCHA sitekey='6Lfu5-ooAAAAAMGil0g9-Q7SKKQKTmntoYO6arEu' onChange={handleRecaptchaChange} />
}

export default Recaptcha
