import { useNavigate } from "react-router-dom";
import "./NewHeader.css";

function Header() {
  const navigate = useNavigate();
  
  return (
    <div className="new-header">
      <button className="back-btn" onClick={() => navigate("/")}>
        &lt;
      </button>
      <h1 className="title">记一笔</h1>
    </div>
  );
}

export default Header;
