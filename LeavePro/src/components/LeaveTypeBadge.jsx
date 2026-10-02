import { leaveCode } from '../utils/leaveUtils';

export default function LeaveTypeBadge({ type }) {
  return <span className="leave-type">{leaveCode(type)}</span>;
}