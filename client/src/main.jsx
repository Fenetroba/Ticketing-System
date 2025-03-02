
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Store } from './app/Store/Store.js'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={Store}>
    <App />
    </Provider>
  </BrowserRouter>
)
