export default function Header({ user }) {
    return
    <header>
        <button className="menu">☰</button>
        <div className="header-user">
            <span className="bell">♢</span>
            <div className="avatar">{user.name.split(' ').map(x => x[0]).join('')}</div>
            <div><b>{user.name}</b><small>{user.role}</small></div>
            <span>⌄</span>
        </div>
    </header>
    
}
