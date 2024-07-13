import Header from "./header"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="content-wrapper">
      <Header />
      <main>{children}</main>
      <video autoPlay muted loop playsInline id="bg-video" className="bg-video">
        <source src="/v7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}