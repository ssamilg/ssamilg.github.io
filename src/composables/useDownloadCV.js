import { ref } from 'vue'

const downloadCounter = ref(0)

export function useDownloadCV() {
  const triggerDownload = () => {
    downloadCounter.value++
  }

  return {
    downloadCounter,
    triggerDownload
  }
}