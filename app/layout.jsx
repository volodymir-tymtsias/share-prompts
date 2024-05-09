import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
  title: 'Share prompts',
  description: 'Discover & Share AI Prompts',
  icons: {
    icon: '/assets/icons/favicon.ico', // /public path
  },
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <div className="app">
            <Nav />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;