import { Provider } from 'react-redux'
import Header from './components/organisms/header'
import PDFViewer from './components/organisms/pdf-viewer'
import store from './store'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { pdfjs } from 'react-pdf'
import Aside from './components/organisms/aside'
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

function App() {
  return (
    <Provider store={store}>
      <div className='mx-auto flex'>
        <Aside />
        <div className='flex size-full flex-1 flex-col gap-4 p-4'>
          <Header />
          <PDFViewer />
        </div>
      </div>
    </Provider>
  )
}

export default App
