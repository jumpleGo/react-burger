import HeaderButton from '../HeaderButton'
import AppHeaderStyles from '../../styles/App/AppHeader.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation} from 'react-router-dom';
function AppHeader () {
    const {pathname} = useLocation()

    return (
        <header className={`${AppHeaderStyles.appHeader} pt-4 pb-4`}>
            <div>
                <div className={AppHeaderStyles.appHeaderButtons}>
                        <HeaderButton to="/" active={pathname === '/'}>
                            <>
                                <BurgerIcon  type='primary' />
                                <span>Конструктор</span>
                            </>
                        </HeaderButton>


                    <HeaderButton to='/orders'>
                        <>
                            <ListIcon  type='secondary' />
                            <span>Лента заказов</span>
                        </>
                    </HeaderButton>

                </div>
            </div>
            <Logo className={AppHeaderStyles.logo} />
            <HeaderButton to="/profile">
                <>
                    <ProfileIcon  type='secondary' />
                    <span>Личный кабинет</span>
                </>
            </HeaderButton>
        </header>
    )
}

export default AppHeader