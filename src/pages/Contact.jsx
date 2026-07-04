import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import characterImg from '../assets/character.png'

// ✅ ඔයාගේ values මෙතනට දාන්න
const EMAILJS_SERVICE_ID  = 'service_26chlkl'
const EMAILJS_TEMPLATE_ID = 'template_sl9en34'
const EMAILJS_PUBLIC_KEY  = 'BNncbt5HMkAfcdWVo'
const GOOGLE_SHEET_URL    = 'https://script.google.com/macros/s/AKfycbzYzIs9_FMMFOq6-av7nqpoJXkUqc1whsZUZZ1s_lvjMuzuQ6794Kd514sgsqKSxs5A/exec'

const ORBIT_RADIUS = 220

const socialLinks = [
  { icon: FaLinkedin,  href: 'https://www.linkedin.com/in/anjula-nimedha-1199a930b/', label: 'LinkedIn',  bg: '#0A66C2', shadow: 'rgba(10,102,194,0.5)'  },
  { icon: FaGithub,    href: 'https://github.com/kanimedha',                          label: 'GitHub',    bg: '#1b1f23', shadow: 'rgba(0,0,0,0.5)'        },
  { icon: FaWhatsapp,  href: 'https://wa.me/94756802678',                             label: 'WhatsApp',  bg: '#25D366', shadow: 'rgba(37,211,102,0.5)'   },
  { icon: FaInstagram, href: 'https://instagram.com/your_username',                   label: 'Instagram', bg: '#d6249f', shadow: 'rgba(214,36,159,0.5)'   },
  { icon: FaFacebook,  href: 'https://facebook.com/your_username',                    label: 'Facebook',  bg: '#1877F2', shadow: 'rgba(24,119,242,0.5)'   },
  { icon: Mail,        href: 'mailto:anjunimeda@gmail.com',                           label: 'Email',     bg: '#EA4335', shadow: 'rgba(234,67,53,0.5)'    },
]

const contactInfo = [
  { icon: Mail,   text: 'anjunimeda@gmail.com',                                           href: 'mailto:anjunimeda@gmail.com' },
  { icon: Phone,  text: '+94 75 680 2678',                                                href: 'tel:+94756802678'            },
  { icon: MapPin, text: '357/H, Ukkotuwa Road, Pragathi Mawatha, Kahathuduwa, Sri Lanka', href: null                          },
]

function buildStyles() {
  const n = socialLinks.length
  const keyframes = socialLinks.map(function(_, i) {
    const start = (i / n) * 360
    const end = start + 360
    return (
      '@keyframes orbit-' + i + '{' +
        'from{transform:rotate(' + start + 'deg) translateX(' + ORBIT_RADIUS + 'px) rotate(' + (-start) + 'deg)}' +
        'to{transform:rotate(' + end + 'deg) translateX(' + ORBIT_RADIUS + 'px) rotate(' + (-end) + 'deg)}' +
      '}' +
      '.orbit-' + i + '{animation:orbit-' + i + ' 12s linear infinite;}' +
      '.orbit-' + i + ':hover{animation-play-state:paused;filter:brightness(1.35);}'
    )
  }).join('')

  return keyframes + `
    @keyframes spin-ring { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes pulse-glow { 0%,100%{opacity:.25;transform:scale(1)} 50%{opacity:.08;transform:scale(1.06)} }
    .orbit-base {
      position:absolute; width:44px; height:44px; border-radius:50%;
      display:flex; align-items:center; justify-content:center; color:#fff;
      top:50%; left:50%; margin-top:-22px; margin-left:-22px;
      text-decoration:none; cursor:pointer; z-index:10; transition:filter .2s;
    }
  `
}

function CharacterWithOrbit() {
  const size = ORBIT_RADIUS * 2 + 100
  return (
    <>
      <style>{buildStyles()}</style>
      <div style={{ position:'relative', width:size, height:size+80, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <div style={{ position:'absolute', inset:25, borderRadius:'50%', border:'3px dashed rgba(59,130,246,0.25)', animation:'spin-ring 22s linear infinite' }} />
        <div style={{ position:'absolute', inset:25, borderRadius:'50%', border:'3px dashed rgba(59,130,246,0.25)',animation:'spin-ring 22s linear infinite' }} />
        <div style={{ position:'absolute', inset:25, borderRadius:'50%', border:'3px dashed rgba(59,130,246,0.25)',animation:'spin-ring 10s linear infinite' }} />

        <div style={{ position:'absolute', inset:55, borderRadius:'50%', background:'radial-gradient(circle, rgba(59,130,246,0.09), transparent 70%)', animation:'pulse-glow 3s ease-in-out infinite' }} />
        <div style={{ position:'relative', zIndex:5, display:'flex', alignItems:'flex-end', justifyContent:'center', height:size+60 }}>
          <img src={characterImg} alt="Character" style={{ width:350, objectFit:'contain', objectPosition:'bottom', maxHeight:size+60, display:'block' }} />
        </div>
        {socialLinks.map(function(social, i) {
          var Icon = social.icon
          return (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
              aria-label={social.label} title={social.label}
              className={'orbit-base orbit-' + i}
              style={{ background:social.bg, boxShadow:'0 4px 16px ' + social.shadow }}
            >
              <Icon size={18} />
            </a>
          )
        })}
      </div>
    </>
  )
}

const inputCls = 'w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition placeholder:text-gray-400'

function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function handleChange(e) {
    setForm(function(prev) {
      return Object.assign({}, prev, { [e.target.name]: e.target.value })
    })
  }

  async function handleSend() {
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')

    try {
      // ✅ 1. EmailJS — email receive කරන්න
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      // ✅ 2. Google Sheets — data save කරන්න
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          message: form.message,
        }),
      })

      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(function() { setStatus('idle') }, 4000)

    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(function() { setStatus('idle') }, 4000)
    }
  }

  function renderBtn() {
    if (status === 'success') {
      return (
        <span style={{ display:'flex', alignItems:'center', gap:6 }}>
          <CheckCircle size={15} /> Message sent!
        </span>
      )
    }
    if (status === 'error') {
      return (
        <span style={{ display:'flex', alignItems:'center', gap:6 }}>
          <AlertCircle size={15} /> Failed — try again
        </span>
      )
    }
    if (status === 'loading') {
      return (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          style={{ display:'inline-block', width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%' }}
        />
      )
    }
    return (
      <span style={{ display:'flex', alignItems:'center', gap:6 }}>
        <Send size={15} /> Send message
      </span>
    )
  }

  const btnClass = (
    'w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition shadow-lg ' +
    (status === 'success' ? 'bg-emerald-600 text-white shadow-emerald-500/20' :
     status === 'error'   ? 'bg-red-500 text-white shadow-red-500/20' :
                            'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20')
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 py-12 w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl mx-auto">

        <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, type:'spring' }} className="flex-1 flex justify-right">
          <CharacterWithOrbit />
        </motion.div>

        <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, type:'spring' }} className="flex-1 flex flex-col gap-5">

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-8 h-px bg-blue-500" />
              <p className="text-xs font-semibold text-blue-500 uppercase tracking-[0.2em]">Get in touch</p>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Let's start a<br />conversation</h2>
          </div>

          <div className="flex flex-col gap-3">
            {contactInfo.map(function(item, i) {
              var Icon = item.icon
              return (
                <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 + i * 0.1 }} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  {item.href
                    ? <a href={item.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 transition mt-1">{item.text}</a>
                    : <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.text}</p>
                  }
                </motion.div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <input
              type="text" name="name" placeholder="Your name"
              value={form.name} onChange={handleChange}
              className={inputCls}
            />
            <input
              type="email" name="email" placeholder="Your email"
              value={form.email} onChange={handleChange}
              className={inputCls}
            />
            <textarea
              name="message" placeholder="Your message..." rows={4}
              value={form.message} onChange={handleChange}
              className={inputCls + ' resize-none'}
            />

            <motion.button
              onClick={handleSend}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={status === 'loading' || status === 'success'}
              className={btnClass}
            >
              {renderBtn()}
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Contact