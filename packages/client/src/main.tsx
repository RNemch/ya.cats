import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { registerServiceWorker } from '@utils/register-sw'
import { registerOnlineStatusChecker } from '@utils/register-online-status-checker'
import notificationService from '@services/notification.service'
import './index.css'

ReactDOM.hydrateRoot(document.querySelector('#root') as HTMLElement, <App />)

registerServiceWorker()
registerOnlineStatusChecker()
notificationService.register()
