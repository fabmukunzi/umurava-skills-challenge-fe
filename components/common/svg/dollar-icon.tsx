const DollarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 25"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12.8989" r="10" stroke="#2B71F0" stroke-width="1.5" fill="none" />
    <path
      d="M12 17.8989V18.3989V18.8989"
      stroke={props.color}
      stroke-width="1.5"
      stroke-linecap="round"
      fill="none"
    />
    <path
      d="M12 6.89893V7.39893V7.89893"
      stroke={props.color}
      stroke-width="1.5"
      stroke-linecap="round"
      fill="none"
    />
    <path
      d="M15 10.3989C15 9.01821 13.6569 7.89893 12 7.89893C10.3431 7.89893 9 9.01821 9 10.3989C9 11.7796 10.3431 12.8989 12 12.8989C13.6569 12.8989 15 14.0182 15 15.3989C15 16.7796 13.6569 17.8989 12 17.8989C10.3431 17.8989 9 16.7796 9 15.3989"
      stroke={props.color}
      stroke-width="1.5"
      stroke-linecap="round"
      fill="none"
    />
  </svg>
);
export default DollarIcon;
