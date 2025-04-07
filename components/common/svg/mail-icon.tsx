const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.9033 8.85107L13.46 12.4641C12.6205 13.1301 11.4394 13.1301 10.5999 12.4641L6.11914 8.85107"
      stroke={props.color}
      fill="none"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49882 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49882 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z"
      stroke={props.color}
      fill="none"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default MailIcon;
