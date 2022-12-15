import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

function Share() {
  // const [imageData, setImageData] = useContext(ImageContext)
  return (
    <div className="brush-img float-end">
      <div className="text-center">
        <div className="d-inline-block border rounded-2 mt-3">
          <ul className="list-unstyled list-inline m-0 d-flex align-items-center justify-content-center">
            <li className="list-inline-item mx-0">
              <div className="share-to px-3">Share</div>
            </li>
            <li className="list-inline-item mx-0 cursor-pointer">
              <div className="share-media border-start d-flex align-items-center justify-content-center">
                <FacebookShareButton
                  windowHeight={600}
                  windowWidth={800}
                  url={process.env.REACT_APP_FRONTEND_URL}
                  quote={"Touchupp Image"}
                  hashtag={"#Touchupp"}
                  description={"Touchupp Image"}
                  className="facbook-share-button"
                >
                  <svg
                    width="12"
                    height="18"
                    viewBox="0 0 12 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.125 18V10.125H10.5L11.0625 6.75H7.125V5.0625C7.125 3.9375 7.68862 3.375 8.8125 3.375H10.5V0C9.9375 0 8.6775 0 7.6875 0C4.875 0 3.75 1.6875 3.75 4.5V6.75H0.375V10.125H3.75V18H7.125Z"
                      fill="#3B5998"
                    />
                  </svg>
                </FacebookShareButton>
              </div>
            </li>
            <li className="list-inline-item mx-0 cursor-pointer">
              <div className="share-media border-start d-flex align-items-center justify-content-center">
                <WhatsappShareButton
                  windowHeight={600}
                  windowWidth={800}
                  title="Touchupp Image"
                  url={process.env.REACT_APP_FRONTEND_URL}
                  description={"Touchupp Image"}
                  className="email-share-button"
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
              </div>
            </li>
            <li className="list-inline-item mx-0 cursor-pointer">
              <div className="share-media border-start d-flex align-items-center justify-content-center">
                <TwitterShareButton
                  windowHeight={600}
                  windowWidth={800}
                  url={process.env.REACT_APP_FRONTEND_URL}
                  title={"TouchUpp Image"}
                  hashtags={["Touchupp"]}
                  className="twitter-share-button"
                >
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.996 2.41831C17.3339 2.7125 16.6229 2.91106 15.8754 2.99938C16.6376 2.54263 17.2231 1.81925 17.4993 0.9575C16.7855 1.37994 15.9957 1.68819 15.1548 1.853C14.4809 1.13581 13.5213 0.6875 12.4587 0.6875C10.4197 0.6875 8.76761 2.34012 8.76761 4.37919C8.76761 4.66831 8.79967 4.95069 8.86268 5.22069C5.79424 5.06656 3.07399 3.59675 1.25261 1.36306C0.935363 1.90869 0.753113 2.54262 0.753113 3.21931C0.753113 4.50069 1.40505 5.63019 2.39505 6.29281C1.79036 6.27313 1.22111 6.10775 0.723301 5.831C0.722738 5.84619 0.722738 5.8625 0.722738 5.87712C0.722738 7.66644 1.99511 9.15875 3.6843 9.49794C3.37493 9.58175 3.04868 9.62731 2.71174 9.62731C2.47324 9.62731 2.24261 9.60425 2.01761 9.5615C2.48674 11.0274 3.8508 12.095 5.46574 12.1254C4.20293 13.1154 2.61105 13.7066 0.881363 13.7066C0.583238 13.7066 0.289051 13.6891 0.000488281 13.6548C1.63399 14.7011 3.57461 15.3125 5.6598 15.3125C12.4503 15.3125 16.1645 9.68694 16.1645 4.80781C16.1645 4.64806 16.16 4.48831 16.1532 4.32969C16.8749 3.80938 17.5004 3.15969 17.996 2.41831Z"
                      fill="#55ACEE"
                    />
                  </svg>
                </TwitterShareButton>
              </div>
            </li>
            <li className="list-inline-item mx-0 cursor-pointer">
              <div className="share-media border-start d-flex align-items-center justify-content-center">
                <PinterestShareButton
                  windowHeight={600}
                  windowWidth={800}
                  url={process.env.REACT_APP_FRONTEND_URL}
                  media={process.env.REACT_APP_FRONTEND_URL}
                  description={"Touchupp Image"}
                  className="pinterest-share-button"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99775 0.00393677C4.02863 0.00393677 0 4.032 0 9.00225C0 12.6872 2.21512 15.8518 5.38594 17.2429C5.36062 16.614 5.38144 15.8597 5.54231 15.1774C5.71556 14.4456 6.69994 10.2729 6.69994 10.2729C6.69994 10.2729 6.41194 9.69862 6.41194 8.85037C6.41194 7.51781 7.18594 6.52162 8.14837 6.52162C8.96625 6.52162 9.36169 7.13531 9.36169 7.87162C9.36169 8.694 8.83631 9.92475 8.56744 11.0644C8.34188 12.0184 9.04669 12.7969 9.98606 12.7969C11.691 12.7969 12.8391 10.6082 12.8391 8.01337C12.8391 6.04181 11.511 4.56637 9.09562 4.56637C6.36637 4.56637 4.6665 6.60094 4.6665 8.87456C4.6665 9.65869 4.89769 10.2116 5.25938 10.6397C5.42644 10.8366 5.4495 10.9147 5.38819 11.1409C5.34656 11.3074 5.24756 11.7051 5.20594 11.8626C5.14575 12.0915 4.96181 12.1725 4.75538 12.0876C3.49819 11.5757 2.91319 10.1987 2.91319 8.65069C2.91319 6.09525 5.06812 3.02962 9.34425 3.02962C12.7789 3.02962 15.0413 5.51587 15.0413 8.18437C15.0413 11.7141 13.0776 14.3511 10.1852 14.3511C9.21319 14.3511 8.29912 13.8257 7.9875 13.2306C7.9875 13.2306 7.46438 15.3039 7.35469 15.7033C7.16344 16.3958 6.78994 17.0904 6.44906 17.631C7.25681 17.8701 8.11181 18 8.99775 18C13.9669 18 17.9949 13.9725 17.9949 9.00225C17.9949 4.032 13.9669 0.00393677 8.99775 0.00393677Z"
                      fill="#CA2028"
                    />
                  </svg>
                </PinterestShareButton>
              </div>
            </li>
            <li className="list-inline-item mx-0 cursor-pointer">
              <div className="share-media border-start d-flex align-items-center justify-content-center">
                <RedditShareButton
                  windowHeight={600}
                  windowWidth={800}
                  title="Touchupp Image"
                  url={process.env.REACT_APP_FRONTEND_URL}
                  description={"Touchupp Image"}
                  className="reddit-share-button"
                >
                  <RedditIcon size={37}></RedditIcon>
                </RedditShareButton>
              </div>
            </li>
            <li className="list-inline-item mx-0 cursor-pointer">
              <div className="share-media border-start d-flex align-items-center justify-content-center">
                <LinkedinShareButton
                  windowHeight={600}
                  windowWidth={800}
                  title="Touchupp Image"
                  summary="Touchupp"
                  url={process.env.REACT_APP_FRONTEND_URL}
                  source={process.env.REACT_APP_FRONTEND_URL}
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.25 13.3844C0.25 13.5813 0.41875 13.75 0.615625 13.75H3.23125C3.42812 13.75 3.59687 13.5813 3.59687 13.3844V4.72189C3.59687 4.52501 3.42812 4.35626 3.23125 4.35626H0.615625C0.41875 4.35626 0.25 4.52501 0.25 4.72189V13.3844Z"
                      fill="#0072FF"
                    />
                    <path
                      d="M11.1062 4.27188C9.84058 4.27188 8.94058 4.77813 8.46245 5.31251C8.34995 5.42501 8.15308 5.34063 8.15308 5.17188V4.72188C8.15308 4.52501 7.98433 4.35626 7.78745 4.35626H5.1437C4.94683 4.35626 4.77808 4.52501 4.77808 4.72188C4.8062 6.32501 4.77808 11.8656 4.77808 13.3563C4.77808 13.5531 4.94683 13.7219 5.1437 13.7219H7.81558C8.01245 13.7219 8.1812 13.5531 8.1812 13.3563V8.65938C8.1812 8.37813 8.1812 8.09688 8.26558 7.90001C8.49058 7.33751 8.99683 6.74688 9.8687 6.74688C11.0218 6.74688 11.5562 7.61876 11.5562 8.88438V13.3563C11.5562 13.5531 11.725 13.7219 11.9218 13.7219H14.5375C14.7343 13.7219 14.9031 13.5531 14.9031 13.3563V8.51876C14.875 5.62188 13.2156 4.27188 11.1062 4.27188Z"
                      fill="#0072FF"
                    />
                    <path
                      d="M1.90937 3.31562C2.97812 3.31562 3.625 2.64062 3.625 1.79687C3.59687 0.896875 2.97813 0.25 1.9375 0.25C0.896875 0.25 0.25 0.896875 0.25 1.76875C0.25 2.64062 0.896875 3.31562 1.90937 3.31562Z"
                      fill="#0072FF"
                    />
                  </svg>
                </LinkedinShareButton>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Share;
