import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import "./contacts.scss"

export const Contacts = () => {
    useDocumentTitle("Contacts | Prazdroj")

    return (
        <main>
            <div className="contacts">
                <div>
                    <h2>Infoline</h2>
                    <FontAwesomeIcon icon={faPhone} />
                    <br />
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>Didn't find the answer on our website? We will be happy to answer your questions on weekdays from 09:00 to 17:00.</p>
                </div>
                <div>
                    <h2>Customer service</h2>
                    <FontAwesomeIcon icon={faPhone} />
                    <br />
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>We are always here for new and existing customers on weekdays from 08:00 to 18:00.</p>
                </div>
                <div>
                    <h2>Export</h2>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>Please direct your export requests to the contact address. They will be dealt with individually by the assigned representatives.</p>
                </div>
            </div>
        </main>
    )
}

export default Contacts
