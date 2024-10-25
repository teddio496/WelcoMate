import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet"></link>
      <title>WelcoMate</title>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
