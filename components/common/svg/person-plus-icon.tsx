const PersonPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 20 20" {...props} xmlns="http://www.w3.org/2000/svg">
    <ellipse
      cx="8.33333"
      cy="5.00002"
      rx="3.33333"
      ry="3.33333"
      stroke={props.color}
      stroke-width="1.5"
      fill="none"
    />
    <path
      d="M17.5003 8.33337H15.8337M15.8337 8.33337H14.167M15.8337 8.33337L15.8337 6.66669M15.8337 8.33337L15.8337 10"
      stroke={props.color}
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M14.9982 15C15.0003 14.8632 15.0003 14.7242 15.0003 14.5833C15.0003 12.5122 12.0156 10.8333 8.33366 10.8333C4.65176 10.8333 1.66699 12.5122 1.66699 14.5833C1.66699 16.6544 1.66699 18.3333 8.33366 18.3333C10.1928 18.3333 11.5335 18.2027 12.5003 17.9695"
      stroke={props.color}
      stroke-width="1.5"
      stroke-linecap="round"
      fill="none"
    />
  </svg>
);
export default PersonPlusIcon;
