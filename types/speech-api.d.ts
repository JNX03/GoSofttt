interface Window {
  SpeechRecognition: typeof SpeechRecognition
  webkitSpeechRecognition: typeof SpeechRecognition
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition
  new (): SpeechRecognition
}

interface SpeechGrammar {
  src: string
  weight: number
}

interface SpeechGrammarList {
  length: number
  item(index: number): SpeechGrammar
  addFromURI(src: string, weight: number): void
  addFromString(string: string, weight: number): void
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognition extends EventTarget {
  grammars: SpeechGrammarList
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  serviceURI: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onnomatch: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionError) => void) | null
  onstart: ((event: Event) => void) | null
  onend: ((event: Event) => void) | null
  onspeechstart: ((event: Event) => void) | null
  onspeechend: ((event: Event) => void) | null
  onsoundstart: ((event: Event) => void) | null
  onsoundend: ((event: Event) => void) | null
  onaudiostart: ((event: Event) => void) | null
  onaudioend: ((event: Event) => void) | null
}

interface SpeechRecognitionError extends Event {
  error: string
  message: string
}
