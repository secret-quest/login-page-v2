import Header from "./header"
import { ReactNode } from "react"
import styles from "./layout.module.css"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.contentWrapper}>
      <Header />
      <main>{children}</main>
      <video autoPlay muted loop playsInline id="bg-video" className={styles.bgVideo}>
        <source src="/v7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}