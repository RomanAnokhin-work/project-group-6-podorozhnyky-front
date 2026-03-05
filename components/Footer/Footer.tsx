import css from "./Footer.module.css";
import Link from "next/link";
import mainCss from "@/app/(main)/Home.module.css";
import Container from "../Container/Container";
  
  
export default function Footer() {
  return (
 
      <footer className={css.footer}>
      <Container className={css.container}>
      
        <div className={css.wrap}>
          <div className={css.content}>
            <div className={css.logo}>
              <Link className={css.logo_link} href="/">
                <svg className={css.logo_icon} width="23" height="23">
                  <use href="/icons.svg#icon-Favicon" />
                </svg>
                <p className={css.logo_text}>Подорожники</p>
              </Link>
            </div>

            <div className={css.links}>
              <ul className={css.links_list}>
                <li className={css.links_item}>
                  <Link
                    className={css.links_icon}
                    target="_blank"
                    href="https://www.facebook.com/"
                    aria-label="Go to Facebook"
                  >
                    <svg className={css.footer_icon} width="32" height="32">
                      <use href="/icons.svg#icon-Facebook" />
                    </svg>
                  </Link>
                </li>
                <li className={css.links_item}>
                  <Link
                    className={css.links_icon}
                    target="_blank"
                    href="https://www.instagram.com/"
                    aria-label="Go to Instagram"
                  >
                    <svg className={css.footer_icon} width="32" height="32">
                      <use href="/icons.svg#icon-Instagram" />
                    </svg>
                  </Link>
                </li>
                <li className={css.links_item}>
                  <Link
                    className={css.links_icon}
                    target="_blank"
                    href="https://x.com/"
                    aria-label="Go to Twitter"
                  >
                    <svg className={css.footer_icon} width="32" height="32">
                      <use href="/icons.svg#icon-X" />
                    </svg>
                  </Link>
                </li>
                <li className={css.links_item}>
                  <Link
                    className={css.links_icon}
                    target="_blank"
                    href="https://www.youtube.com/"
                    aria-label="Go to YouTube"
                  >
                    <svg className={css.footer_icon} width="32" height="32">
                      <use href="/icons.svg#icon-Youtube" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <nav className={css.nav}>
            <ul className={css.nav_list}>
              <li className={css.nav_item}>
                <Link className={css.nav_link} href="/">
                  Головна
                </Link>
              </li>
              <li className={css.nav_item}>
                <Link className={css.nav_link} href="/stories">
                  Історії
                </Link>
              </li>
              <li className={css.nav_item}>
                <Link className={css.nav_link} href="/travellers">
                  Мандрівники
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={css.inscription}>
          <p className={css.text}>© 2025 Подорожники. Усі права захищені.</p>
        </div>
       
        </Container>
      </footer>
    
  );
}
