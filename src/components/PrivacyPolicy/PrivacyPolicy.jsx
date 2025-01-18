/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Main.module.css";
import LiveAnbox from "../LiveAnbox/LiveAnbox";

import { depositlink } from "../../redux/actions/depositAction";
import { loginPost } from "../../redux/actions/loginAction";
import { signPost } from "../../redux/actions/signAction";
import { allboxes } from "../../redux/actions/allboxesAction";
import { balanceget } from "../../redux/actions/balanceGetAction";
import Footer from "../../components/Footer/Footer";

import StickyMenuLogInOptions from '../../components/StickyMenuLogInOptions/StickyMenuLogInOptions'
import DepositPopup from '../../components/DepositPopup/DepositPopup';
import WithdrawPopup from '../../components/WithdrawPopup/WithdrawPopup';
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import SignUpPopup from "../../components/SignUpPopup/SignUpPopup";

import StickyMenuTop from "../../components/StickyMenuTop/StickyMenuTop"

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.example.loading);
  const characters = useSelector((state) => state.example.payload);
  const payloadType = useSelector((state) => state.example.payloadType)
  const [balance, setBalance] = React.useState('0.00')
  const [bonusBoxes, setBonusBoxes] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [showDepositPopup, setShowDP] = React.useState(false);
  const [showWithdrawalPopup, setShowWP] = React.useState(false);
  const [showSignUpPopup, setShowSUP] = React.useState(false);
  const [showLoginPopup, setShowLP] = React.useState(false);
  const [isDepositing, setIsDepositing] = React.useState(false);
  const [showSMLIO, setShowSMLIO] = React.useState(true);
  const [isSignError, setIsSignError] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);
 


  const toggleSMLIO = () => {
    setShowSMLIO(!showSMLIO)
  }

  const toggleDP = () => {
    //window.location.href='https://buy.stripe.com/fZecPK7C1dmr70kfZ0'
    setShowDP(!showDepositPopup)
  }
  const toggleWP = () => {
    setShowWP(!showWithdrawalPopup)
  }

  const toggleSUP = () => {
    setShowSUP(!showSignUpPopup)
    setShowLP(false)
    toggleSMLIO()
  }

  const toggleLP = () => {
    setShowLP(!showLoginPopup)
    setShowSUP(false)
    toggleSMLIO()
  }


  const handleLogin = (username, password) => {
    dispatch(loginPost(username, password))
    //setShowLP(false)
    //setShowSMLIO(false)
    //setLoggedIn(true)
  }

  const handleGoogleLogin = () => {
    window.location.href = window.clientConfig.url+"/google_auth";
  }

  const handleSignUp = (username, password) => {
    dispatch(signPost(username, password))
    //setShowLP(false)
    //setShowSMLIO(false)
    //setLoggedIn(true)
  }


  const onDeposit = (amount) => {
    dispatch(depositlink(amount));
    setIsDepositing(true)
  }

  if (!loading && isDepositing&& characters.url!=undefined) {
    
    localStorage.setItem('depositUrlLog',characters)
    window.location.href = characters.url;
    setIsDepositing(false);
  }

  useEffect(() => {
    dispatch(allboxes(1));
  }, [dispatch]);
  useEffect(() => {
    dispatch(balanceget());
  }, [dispatch])

  useEffect(() => {
    if (characters[0] == "NotLoggedIn") {
      console.log("NotLoggedIn")
      setLoggedIn(false)
    } else {
      if (payloadType == "BALANCE_GET") {
        setLoggedIn(true)
        console.log('balance', characters.balance)
        console.log('bonusBoxes', characters)

        setBonusBoxes(characters.bonus_boxes)
        setBalance(characters.balance)
      }
      else if (payloadType == "LOGIN") {
        if (characters == "ErrorIncorrectPassword") {
          setIsLoginError(true)
        } else {
          setLoggedIn(true)
          console.log("info", characters.balance)
          console.log('balance', characters.balance)
          setBalance(characters.balance)
          setShowLP(false)
        }
      } else if (payloadType == "SIGN") {
        if (characters == "userexists422") {
          setIsSignError(true)
        } else {
          setLoggedIn(true)
          console.log("info", characters.balance)
          console.log('balance', characters.balance)
          setBalance(characters.balance)
          setShowSUP(false)
        }
      }
      else {
        console.log('Unknown Payload')
      }
    }
  }, [loading, characters, payloadType])

  const switchToSUP = () => {
    setShowLP(false)
    setShowSUP(true)
  }
  const switchToLP = () => {
    setShowLP(true)
    setShowSUP(false)
  }


  return (
    <div>
      <StickyMenuTop toggleSP={toggleSUP} openBonusBox={()=>{window.location.href='/'}} toggleLP={toggleLP} bonusBoxes={bonusBoxes} balance={balance} toggleDP={toggleDP} toggleWP={toggleWP} isloggedIn={loggedIn} />
      {showLoginPopup ? (<LoginPopup isError={isLoginError} openSignPopup={switchToSUP} handleLoginGoogle={handleGoogleLogin} handleLogin={handleLogin} closePopup={toggleLP} />) : (<></>)}
      {showSignUpPopup ? (<SignUpPopup handleLoginGoogle={handleGoogleLogin} isError={isSignError} openLoginPopup={switchToLP} handleSignUp={handleSignUp} closePopup={toggleSUP} />) : (<></>)}
      {showDepositPopup ? (<DepositPopup onDeposit={onDeposit} togglePopup={toggleDP}></DepositPopup>) : (<></>)}
      {showWithdrawalPopup ? (<WithdrawPopup togglePopup={toggleWP} />) : (<></>)}
      {loggedIn || !showSMLIO ? (<></>) : (<StickyMenuLogInOptions googleLogin={handleGoogleLogin} logIn={toggleLP} signUp={toggleSUP} />)}
      <div className={styles.container}>
        <div className={styles.leftbody}>
          <h1 className="c6" id="h.5f1oe0lw36jr"><span className="c10">INTRODUCTION</span></h1><p className="c0"><span className="c4">Thank you for choosing to be part of our community at ANBOXME. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</span></p><p className="c0 c7"><span className="c4"></span></p><p className="c0"><span className="c4">When you visit our website https://anboxme.com (&ldquo;Site&rdquo;) and use our services, you trust us with your personal information. We take your privacy very seriously. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our site and our services.</span></p><h4 className="c1" id="h.n7rqlqqwmid3"><span className="c2">WHAT INFORMATION DO WE COLLECT?</span></h4><h5 className="c8" id="h.flqcf9te7180"><span className="c9">Personal information you disclose to us</span></h5><p className="c0 c7"><span className="c4"></span></p><p className="c0"><span className="c4">We collect personal information that you voluntarily provide to us when registering at the Site, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Site (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise contacting us. The personal information that we collect depends on the context of your interactions with us and the Site, the choices you make and the products and features you use, and can include the following:</span></p><p className="c0 c7"><span className="c4"></span></p><ul className="c5 lst-kix_lw322bvpx6v5-0 start"><li className="c0 c3 li-bullet-0"><span className="c4">Name and Contact Data. We collect your first and last name, email address, postal address, phone number, and other similar contact data.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Credentials. We collect passwords, password hints, and similar security information used for authentication and account access.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Payment Data. We collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor and you should review its privacy policies and contact the payment processor directly if you have a question relating to processing of payment data.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Social Media Login Data. We provide you with the option to register using social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the Information described in the section called &quot;How do we Handle your Social Logins&quot; below. All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.</span></li></ul><h4 className="c1" id="h.w8vqf2dkbs5f"><span className="c2">Information automatically collected</span></h4><p className="c0"><span className="c4">We automatically collect certain information when you visit, use or navigate the Site. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Site and other technical information. This information is primarily needed to maintain the security and operation of our Site, and for our internal analytics and reporting purposes.</span></p><p className="c0"><span className="c4">Like many businesses, we also collect information through cookies and similar technologies. </span></p><p className="c0 c7"><span className="c4"></span></p><p className="c0"><span className="c4">Information collected from other Sources</span></p><p className="c0 c7"><span className="c4"></span></p><p className="c0"><span className="c4">We may obtain information about you from other sources, such as public databases, joint marketing partners, social media platforms (such as Facebook), as well as from other third parties. Examples of the information we receive from other sources include: social media profile information (your name, gender, birthday, email, current city, state and country, user identification numbers for your contacts, profile picture URL and any other information that you choose to make public); marketing leads and search results and links, including paid listings (such as sponsored links).</span></p><h4 className="c1" id="h.kehamwy2ogzh"><span className="c2">HOW DO WE USE YOUR INFORMATION?</span></h4><p className="c0"><span className="c4">We use personal information collected via our Site for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests (&quot;Business Purposes&quot;), in order to enter into or perform a contract with you (&quot;Contractual&quot;), with your consent (&quot;Consent&quot;), and/or for compliance with our legal obligations (&quot;Legal Reasons&quot;). We indicate the specific processing grounds we rely on next to each purpose listed below. We use the information we collect or receive.</span></p><p className="c0 c7"><span className="c4"></span></p><ul className="c5 lst-kix_cj758wzax448-0 start"><li className="c0 c3 li-bullet-0"><span className="c4">To facilitate account creation and logon process with your Consent. If you choose to link your account with us to a third party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process. See the section below headed &quot; How do we Handle your Social Logins&quot; for further information.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">To send you marketing and promotional communications for Business Purposes and/or with your Consent. We and/or our third party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt-out of our marketing emails at any time (see &quot;Your Privacy Rights&quot; below).</span></li><li className="c0 c3 li-bullet-0"><span className="c4">To send administrative information to you for Business Purposes, Legal Reasons and/or possibly Contractual. We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Fulfill and manage your orders for Contractual reasons. We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Site.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">To post testimonials with your Consent. We post testimonials on our Site that may contain personal information. Prior to posting a testimonial, we will obtain your written consent to use your name and testimonial. If you wish to update, or delete your testimonial, please contact us and be sure to include your name, testimonial location, and contact information.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Deliver targeted advertising to you for our Business Purposes and/or with your Consent. We may use your information to develop and display content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness. For more information, see our Cookie Policy.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Administer prize draws and competitions for our Business Purposes and/or with your Consent. We may use your information to administer prize draws and competitions when you elect to participate in competitions.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Request Feedback for our Business Purposes and/or with your Consent. We may use your information to request feedback and to contact you about your use of our Site.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">To protect our Site for Business Purposes and/or Legal Reasons. We may use your information as part of our efforts to keep our Site safe and secure (for example, for fraud monitoring and prevention).</span></li><li className="c0 c3 li-bullet-0"><span className="c4">To enable user-to-user communications with your consent. We may use your information in order to enable user-to-user communications with each user&#39;s consent.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">To enforce our terms, conditions and policies for Business Purposes, Legal Reasons and/or possibly Contractual.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">To respond to legal requests and prevent harm for Legal Reasons. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">For other Business Purposes. We may use your information for other Business Purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Site, products, services, marketing and your experience.</span></li></ul><h4 className="c1" id="h.hrhuml2gj9n7"><span className="c2">WILL YOUR INFORMATION BE SHARED WITH ANYONE?</span></h4><p className="c0"><span className="c4">We only share and disclose your information in the following situations:</span></p><p className="c0 c7"><span className="c4"></span></p><ul className="c5 lst-kix_ioco5t2gcsan-0 start"><li className="c0 c3 li-bullet-0"><span className="c4">Compliance with Laws. We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Vital Interests and Legal Rights. We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Vendors, Consultants and Other Third-Party Service Providers. We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Site, which will enable them to collect data about how you interact with the Site over time. This information may be used to, among other things, analyse and track data, determine the popularity of certain content and better understand online activity. Unless described in this Policy, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Third-Party Advertisers. We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to our Website(s) and other websites that are contained in web cookies and other tracking technologies in order to provide advertisements about goods and services of interest to you. See our Cookie Policy for further information</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Affiliates. We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Business Partners. We may share your information with our business partners to offer you certain products, services or promotions.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">With your Consent. We may disclose your personal information for any other purpose with your consent.</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Other Users. When you share personal information (for example, by posting comments, contributions or other content to the Site) or otherwise interact with public areas of the Site, such personal information may be viewed by all users and may be publicly distributed outside the Site in perpetuity. If you interact with other users of our Site and register through a social network (such as Facebook), your contacts on the social network will see your name, profile photo, and descriptions of your activity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Site, and view your profile.</span></li></ul><h4 className="c1" id="h.oetths7wk727"><span className="c2">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</span></h4><p className="c0"><span className="c4">Our Site offers you the ability to register and login using your third party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile Information we receive may vary depending on the social media provider concerned, but will often include your name, e-mail address, friends list, profile picture as well as other information you choose to make public. If you login using Facebook, we may also request access to other permissions related to your account, such as friends, check-ins, and likes, and you may choose to grant or deny us access to each individual permission.</span></p><p className="c0"><span className="c4">We will use the information we receive only for the purposes that are described in this privacy policy or that are otherwise made clear to you on the Site. Please note that we do not control, and are not responsible for, other uses of your personal information by your third party social media provider. We recommend that you review their privacy policy to understand how they collect, use and share your personal information, and how you can set your privacy preferences on their sites and apps.</span></p><h4 className="c1" id="h.upsugplomzni"><span className="c2">IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</span></h4><p className="c0"><span className="c4">If you are a resident in the European Economic Area (EEA), then these countries may not have data protection or other laws as comprehensive as those in your country. We will take all reasonable measures that we can to protect your personal information in accordance with this privacy policy and applicable law.</span></p><p className="c0"><span className="c4">To the extent that any personal information is provided to third parties outside the EEA, or who will access the information from outside the EEA, we will ensure that approved safeguards are in place, such as the approved standard EU model contract clauses or the EU/US Privacy Shield.</span></p><h4 className="c1" id="h.twr7gltqnoql"><span className="c2">WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</span></h4><p className="c0"><span className="c4">The Site may contain advertisements from third parties that are not affiliated with us and which may link to other websites, online services or mobile applications. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy policy. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services or applications that may be linked to or from the Site. You should review the policies of such third parties and contact them directly to respond to your questions.</span></p><h4 className="c1" id="h.9i8abqm5hbg"><span className="c2">HOW LONG DO WE KEEP YOUR INFORMATION?</span></h4><p className="c0"><span className="c4">We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</span></p><p className="c0"><span className="c4">When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</span></p><h4 className="c1" id="h.mjk6svlnb9c3"><span className="c2">HOW DO WE KEEP YOUR INFORMATION SAFE?</span></h4><p className="c0"><span className="c4">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Site is at your own risk. You should only access our services within a secure environment.</span></p><h4 className="c1" id="h.860vp3kamcvr"><span className="c2">DO WE COLLECT INFORMATION FROM MINORS?</span></h4><p className="c0"><span className="c4">We do not knowingly solicit data from or market to children under 18 years of age. By using the Site, you represent that you are at least 18 years of age. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us.</span></p><h4 className="c1" id="h.m20h1hytpfue"><span className="c2">WHAT ARE YOUR PRIVACY RIGHTS?</span></h4><p className="c0"><span className="c4">In some regions, you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. We will consider and act upon any request in accordance with applicable data protection laws.</span></p><p className="c0 c7"><span className="c4"></span></p><p className="c0"><span className="c4">If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal.</span></p><h4 className="c1" id="h.3azo5des29c"><span className="c2">ACCOUNT INFORMATION</span></h4><p className="c0"><span className="c4">You may at any time review or change the information in your account or terminate your account by:</span></p><ul className="c5 lst-kix_sdzei02cexln-0 start"><li className="c0 c3 li-bullet-0"><span className="c4">Logging into your account settings and updating your account</span></li><li className="c0 c3 li-bullet-0"><span className="c4">Contacting us using the contact information provided below</span></li></ul><p className="c0 c7"><span className="c4"></span></p><p className="c0"><span className="c4">Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Service and/or comply with legal requirements.</span></p><p className="c0 c7"><span className="c4"></span></p><p className="c0"><span className="c4">Cookies and similar technologies: Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Site. To opt-out of interest-based advertising by advertisers on our Site visit http://www.aboutads.info/choices/. For further information, please see our Cookie Policy</span></p><p className="c0"><span className="c4">Opting out of email marketing: You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list &ndash; however, we will still need to send you service-related emails that are necessary for the administration and use of your account. You can also opt-out by:</span></p><ul className="c5 lst-kix_j4qome6h1tr6-0 start"><li className="c0 c3 li-bullet-0"><span className="c4">Contacting us using the contact information provided below</span></li></ul><h4 className="c1" id="h.awpe4el3vvh3"><span className="c2">DO WE MAKE UPDATES TO THIS POLICY?</span></h4><p className="c0"><span className="c4">We may update this privacy policy from time to time. The updated version will be indicated by an updated &ldquo;Revised&rdquo; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</span></p><p className="c0 c7"><span className="c4"></span></p>
        </div>
        <LiveAnbox />
      </div>
      <Footer></Footer>
    </div>
  )
};

export default PrivacyPolicy;
