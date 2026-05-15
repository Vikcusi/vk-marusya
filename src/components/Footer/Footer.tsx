import IconVk from "../../assets/icon/social-media/vk.svg"
import IconOk from "../../assets/icon/social-media/ok.svg"
import IconTelegram from "../../assets/icon/social-media/telegram.svg"
import IconYouTube from "../../assets/icon/social-media/youtube.svg"
import "./Footer.css"
import "../../App.css"

export const Footer = () => {
    return (
        <footer className="footer">
            <div className='container'>
                <div className="footer__wrapper">
                    <img className="footer__icon" src={IconVk} alt="Вконтакте" />
                    <img className="footer__icon" src={IconOk} alt="Одноклассники" />
                    <img className="footer__icon" src={IconTelegram} alt="Telegram" />
                    <img className="footer__icon" src={IconYouTube} alt="YouTube" />
                </div>
            </div>
        </footer>
    )
}