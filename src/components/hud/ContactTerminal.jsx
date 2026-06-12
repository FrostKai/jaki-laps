import { useState, useRef, useEffect } from 'react'
import useStore from '../../store/useStore'
import { IoTerminalOutline, IoSendOutline, IoSparklesOutline } from 'react-icons/io5'

const ContactTerminal = () => {
  const addLog = useStore((state) => state.addLog)
  const hackMode = useStore((state) => state.hackMode)
  const [interfaceMode, setInterfaceMode] = useState('terminal') // 'terminal' | 'gui'
  
  // CLI State
  const [history, setHistory] = useState([
    { text: 'OPERATOR UPLINK MODULE v1.0.8', type: 'system' },
    { text: 'Establishing secure STMP neural bridge... SUCCESS', type: 'system' },
    { text: 'Type "help" for a list of available actions, or "wizard" to run the guided setup.', type: 'system' },
    { text: ' ', type: 'system' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [wizardStep, setWizardStep] = useState(0) // 0: idle, 1: name, 2: email, 3: message, 4: confirm
  const [wizardData, setWizardData] = useState({ name: '', email: '', message: '' })
  
  // GUI Form State
  const [guiForm, setGuiForm] = useState({ name: '', email: '', message: '' })
  const [guiSending, setGuiSending] = useState(false)
  const [guiSent, setGuiSent] = useState(false)

  const terminalEndRef = useRef(null)

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  // CLI Command Handler
  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim()
    if (!trimmed) return

    const newHistory = [...history, { text: `operator@jakilabs:~$ ${trimmed}`, type: 'user' }]
    setInputValue('')

    // Check if in wizard mode
    if (wizardStep > 0) {
      processWizard(trimmed, newHistory)
      return
    }

    const tokens = trimmed.split(' ')
    const cmd = tokens[0].toLowerCase()

    switch (cmd) {
      case 'help':
        setHistory([
          ...newHistory,
          { text: 'AVAILABLE COMMANDS:', type: 'system' },
          { text: '  wizard                Launch guided contact setup (Recommended)', type: 'system' },
          { text: '  send-message --name "N" --email "E" --text "M"   Direct packet transmit', type: 'system' },
          { text: '  clear                 Purge console history', type: 'system' },
          { text: '  gui                   Switch to GUI dashboard interface', type: 'system' },
          { text: '  sysinfo               Display system metrics', type: 'system' }
        ])
        break
      case 'clear':
        setHistory([])
        break
      case 'gui':
        setHistory([...newHistory, { text: 'Loading graphic UI modules...', type: 'system' }])
        setTimeout(() => setInterfaceMode('gui'), 400)
        break
      case 'sysinfo':
        setHistory([
          ...newHistory,
          { text: 'SYSTEM SCHEMATICS:', type: 'system' },
          { text: `  Core Status: ${hackMode ? 'OVERLOAD' : 'STABLE'}`, type: 'system' },
          { text: '  Bandwidth: 100 Gbit/s', type: 'system' },
          { text: '  Quantum Encryption: Enabled (AES-GCM-256)', type: 'system' }
        ])
        break
      case 'wizard':
        setWizardStep(1)
        setHistory([
          ...newHistory,
          { text: '--- WIZARD INITIALIZED ---', type: 'system' },
          { text: 'Enter your identity (Name):', type: 'system' }
        ])
        break
      case 'send-message':
        // Parse basic flags
        const nameMatch = trimmed.match(/--name\s+["']([^"']+)["']/)
        const emailMatch = trimmed.match(/--email\s+["']([^"']+)["']/)
        const textMatch = trimmed.match(/--text\s+["']([^"']+)["']/)
        
        if (nameMatch && emailMatch && textMatch) {
          const name = nameMatch[1]
          const email = emailMatch[1]
          const text = textMatch[1]
          
          setHistory([
            ...newHistory,
            { text: `Packaging packet from ${name}...`, type: 'system' },
            { text: 'Routing packet through gateways...', type: 'system' },
            { text: 'TRANSMISSION DELIVERED. Log ID: TX-' + Math.floor(Math.random()*80000+10000), type: 'success' }
          ])
          addLog(`[SYS_ACTION] Contact form submitted via CLI: ${name}`)
        } else {
          setHistory([
            ...newHistory,
            { text: 'ERROR: Invalid arguments. Correct syntax:', type: 'error' },
            { text: '  send-message --name "Your Name" --email "your@email.com" --text "Your Message"', type: 'error' }
          ])
        }
        break
      default:
        setHistory([
          ...newHistory,
          { text: `Unknown command: "${cmd}". Type "help" for options.`, type: 'error' }
        ])
    }
  }

  // Wizard Step-by-step processor
  const processWizard = (val, currentHistory) => {
    if (wizardStep === 1) {
      setWizardData(prev => ({ ...prev, name: val }))
      setWizardStep(2)
      setHistory([
        ...currentHistory,
        { text: `Name set to: ${val}`, type: 'info' },
        { text: 'Enter your communication address (Email):', type: 'system' }
      ])
    } else if (wizardStep === 2) {
      // Basic email check
      if (!val.includes('@')) {
        setHistory([
          ...currentHistory,
          { text: 'WARNING: Invalid email signature. Re-enter email address:', type: 'error' }
        ])
        return
      }
      setWizardData(prev => ({ ...prev, email: val }))
      setWizardStep(3)
      setHistory([
        ...currentHistory,
        { text: `Email set to: ${val}`, type: 'info' },
        { text: 'Input transmission details (Message):', type: 'system' }
      ])
    } else if (wizardStep === 3) {
      setWizardData(prev => ({ ...prev, message: val }))
      setWizardStep(4)
      setHistory([
        ...currentHistory,
        { text: `Message logged.`, type: 'info' },
        { text: ' ', type: 'system' },
        { text: '--- CONFIRM TRANSMISSION ---', type: 'system' },
        { text: `  Name:    ${wizardData.name}`, type: 'info' },
        { text: `  Email:   ${wizardData.email}`, type: 'info' },
        { text: `  Message: ${val}`, type: 'info' },
        { text: 'Submit packet to mainframe? (y/n):', type: 'system' }
      ])
    } else if (wizardStep === 4) {
      if (val.toLowerCase() === 'y' || val.toLowerCase() === 'yes') {
        setHistory([
          ...currentHistory,
          { text: 'Encrypting data packets...', type: 'system' },
          { text: 'Broadcasting packet beacon to Jaki Labs node...', type: 'system' },
          { text: 'TRANSMISSION DELIVERED SECURELY. Log ID: TX-' + Math.floor(Math.random()*80000+10000), type: 'success' },
          { text: 'Type "wizard" to send another, or "gui" to change mode.', type: 'system' }
        ])
        addLog(`[SYS_ACTION] Contact form submitted via CLI Wizard: ${wizardData.name}`)
      } else {
        setHistory([
          ...currentHistory,
          { text: 'Transmission aborted. Form data cleared.', type: 'error' },
          { text: 'Command prompt ready.', type: 'system' }
        ])
      }
      // Reset wizard
      setWizardStep(0)
      setWizardData({ name: '', email: '', message: '' })
    }
  }

  // GUI Form Submission
  const handleGuiSubmit = (e) => {
    e.preventDefault()
    if (!guiForm.name || !guiForm.email || !guiForm.message) return
    
    setGuiSending(true)
    setTimeout(() => {
      setGuiSending(false)
      setGuiSent(true)
      addLog(`[SYS_ACTION] Contact form submitted via GUI: ${guiForm.name}`)
      
      // Auto reset success screen
      setTimeout(() => {
        setGuiSent(false)
        setGuiForm({ name: '', email: '', message: '' })
      }, 5000)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full space-y-6 pointer-events-auto">
      {/* Header with Mode Toggle */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h2 className="text-xl font-bold font-scifi tracking-widest text-white uppercase flex items-center gap-2">
            CONTACT_TERMINAL
          </h2>
          <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-0.5">
            Synchronize neural communications channel with Jaki Labs core.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex space-x-2">
          <button
            onClick={() => setInterfaceMode('terminal')}
            className={`px-3 py-1 text-xs border rounded transition-all duration-200 font-scifi flex items-center gap-1.5 ${
              interfaceMode === 'terminal'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 text-white/40 hover:text-white/80'
            }`}
          >
            <IoTerminalOutline /> CLI_SHELL
          </button>
          <button
            onClick={() => setInterfaceMode('gui')}
            className={`px-3 py-1 text-xs border rounded transition-all duration-200 font-scifi flex items-center gap-1.5 ${
              interfaceMode === 'gui'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 text-white/40 hover:text-white/80'
            }`}
          >
            <IoSendOutline /> COMMAND_FORM
          </button>
        </div>
      </div>

      {/* Interface Area */}
      <div className="flex-1 flex flex-col justify-stretch">
        {interfaceMode === 'terminal' ? (
          
          // TERMINAL CLI SHELL VIEW
          <div className="flex-1 border border-primary/10 bg-bg/10 backdrop-blur-xl rounded flex flex-col overflow-hidden h-[360px] lg:h-auto">
            {/* Console top bar */}
            <div className="bg-white/5 px-4 py-2 text-xs font-mono text-white/50 border-b border-white/5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5FF]/60 animate-pulse" />
              <span>TERMINAL_SESSION: operator@jakilabs:~</span>
            </div>

            {/* Print Output */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] space-y-1.5 select-text scrollbar-thin">
              {history.map((line, idx) => {
                let color = 'text-white/60'
                if (line.type === 'user') color = 'text-accent'
                else if (line.type === 'error') color = 'text-danger'
                else if (line.type === 'success') color = 'text-emerald-400 font-bold'
                else if (line.type === 'info') color = 'text-secondary'

                return (
                  <div key={idx} className={`${color} leading-normal`}>
                    {line.text}
                  </div>
                )
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Line */}
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                handleCommand(inputValue)
              }}
              className="p-3 bg-white/5 border-t border-white/5 flex items-center font-mono text-xs gap-2"
            >
              <span className="text-primary tracking-wider font-bold">operator@jakilabs:~$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={wizardStep > 0 ? "Type response..." : "Type command, e.g. 'help' or 'wizard'..."}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-primary focus:ring-0 p-0"
                autoFocus
              />
            </form>
          </div>

        ) : (
          
          // GRAPHIC GUI VIEW
          <div className="flex-1 border border-white/5 bg-bg/10 backdrop-blur-md p-6 rounded flex flex-col justify-center">
            {guiSent ? (
              <div className="text-center space-y-4 py-10 animate-fade-in">
                <div className="w-12 h-12 border border-emerald-400 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-xl">
                  <IoSparklesOutline className="animate-spin-slow" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-scifi text-emerald-400">TRANSMISSION ROUTED</h3>
                  <p className="text-xs font-mono text-white/50">
                    Neural connection secured. Jaki Labs will process your request shortly.
                  </p>
                </div>
                <p className="text-[10px] text-white/30 font-mono">Log ID: TX-{Math.floor(Math.random()*80000+10000)}</p>
              </div>
            ) : (
              <form onSubmit={handleGuiSubmit} className="space-y-4 max-w-xl mx-auto w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-white/40 tracking-widest block">OPERATOR_IDENT</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={guiForm.name}
                      onChange={(e) => setGuiForm({ ...guiForm, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white font-mono text-xs rounded p-2.5 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-white/40 tracking-widest block">EMAIL_SIGNATURE</label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={guiForm.email}
                      onChange={(e) => setGuiForm({ ...guiForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white font-mono text-xs rounded p-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-white/40 tracking-widest block">TRANSMISSION_PACKET_CONTENT</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter message details..."
                    value={guiForm.message}
                    onChange={(e) => setGuiForm({ ...guiForm, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white font-mono text-xs rounded p-2.5 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={guiSending}
                  className={`w-full py-2.5 border text-center font-scifi font-bold text-xs rounded transition-all duration-300 flex items-center justify-center gap-2 ${
                    guiSending
                      ? 'border-white/10 text-white/20 bg-white/5 cursor-not-allowed'
                      : hackMode
                        ? 'border-danger/40 bg-danger/10 text-danger hover:bg-danger/20 hover:border-danger'
                        : 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary'
                  }`}
                >
                  {guiSending ? 'SYNCHRONIZING...' : 'TRANSMIT SIGNAL'}
                </button>
              </form>
            )}
          </div>

        )}
      </div>
    </div>
  )
}

export default ContactTerminal
