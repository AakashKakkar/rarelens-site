export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 flex justify-center">
      <div className="max-w-[800px] w-full">

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-gray-400 mb-6">
          Effective Date: April 13, 2026
        </p>

        <p className="mb-8 text-gray-300 leading-relaxed">
          RareLens (“RareLens”, “we”, “our”, or “us”) respects your privacy and is committed to protecting your information.
          This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and application.
        </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc pl-5 space-y-2">
            <li>Name, phone number, and email address</li>
            <li>Profile information and user-generated content</li>
            <li>App usage data and interactions</li>
            <li>Device and log information (IP address, device type, operating system)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-2">
            <li>To create and manage your account</li>
            <li>To provide and improve RareLens services</li>
            <li>To personalize your experience</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </Section>

        <Section title="3. Communication & Messaging">
          <p className="text-gray-300 leading-relaxed">
            By providing your phone number and using RareLens, you consent to receive communications from us.
            These communications are strictly related to the operation and security of the service and may include:
          </p>

          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>One-Time Passwords (OTP) for account verification</li>
            <li>Account-related notifications</li>
            <li>Service updates and important alerts</li>
          </ul>

          <p className="mt-4 text-gray-300 leading-relaxed">
            Messages may be sent via SMS (including toll-free numbers) or email.
            RareLens does not send unsolicited promotional or marketing SMS messages.
          </p>
        </Section>

        <Section title="4. User Consent">
          <p className="text-gray-300 leading-relaxed">
            Users provide consent by entering their phone number during onboarding and verifying it via OTP.
            This constitutes explicit consent to receive transactional messages necessary for account access and service functionality.
          </p>
        </Section>

        <Section title="5. Data Sharing">
          <p className="text-gray-300 leading-relaxed">
            RareLens does not sell your personal data.
          </p>

          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>We may share data with trusted service providers (such as messaging and hosting providers) to operate our services</li>
            <li>We may disclose information if required by law or legal process</li>
          </ul>
        </Section>

        <Section title="6. Data Security">
          <p className="text-gray-300 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your data, including encryption and secure infrastructure.
            However, no method of transmission or storage is completely secure.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p className="text-gray-300 leading-relaxed">
            We retain your data only for as long as necessary to provide our services and comply with legal obligations.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <ul className="list-disc pl-5 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </Section>

        <Section title="9. Children’s Privacy">
          <p className="text-gray-300 leading-relaxed">
            RareLens is not intended for users under the age of 13, and we do not knowingly collect personal data from children.
          </p>
        </Section>

        <Section title="10. Updates to This Policy">
          <p className="text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. Updates will be reflected on this page with a revised effective date.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p className="text-gray-300">
            If you have any questions or concerns about this Privacy Policy, you can contact us at:
          </p>
          <p className="mt-2 text-white font-semibold">
            hello@rarelens.ai
          </p>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}