import { IoMenu } from 'react-icons/io5';
import Classes from './Header.module.css';

function LowerHeader() {
  return (
    <div className={Classes.lower_container}>
      <ul>
        <li>
          <IoMenu />
          All
        </li>
        <li>Today's Deals</li>
        <li>Registry</li>
        <li>Prime Video</li>
        <li>Gift Cards</li>
        <li>Customer Service</li>
      </ul>
    </div>
  );
}

export default LowerHeader;



