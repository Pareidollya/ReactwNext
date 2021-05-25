 import Document, { Html, Head, Main, NextScript } from 'next/document'

 export default class MyDocument extends Document{ //globalização das fontes
     render(){

         return(
             <Html>
                 <Head>
                 <link rel="preconnect" href="https://fonts.gstatic.com"/>
                 <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />                 
                
                 <link 
                  rel="shortcut icon"
                  href = "https://cdn.discordapp.com/attachments/299228773415649281/846744170026500126/5b6e9a73332d4ede392e4b6523c7c4b5.png" 
                  type = "image/png"
                  />
                 </Head>
                 <body>
                     <Main />
                     <NextScript />

                 </body>

             </Html>
         )
     }
 }