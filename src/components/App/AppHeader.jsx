import HeaderButton from '../HeaderButton'
import AppHeaderStyles from '../../styles/App/AppHeader.module.css'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
function AppHeader () {
    return (
        <header className={`${AppHeaderStyles.appHeader} pt-4 pb-4`}>
            <div>
                <div className={AppHeaderStyles.appHeaderButtons}>
                    <HeaderButton active>
                        <>
                            <BurgerIcon  type='primary' />
                            <span>Конструктор</span>
                        </>
                    </HeaderButton>
                    <HeaderButton>
                        <>
                            <ListIcon  type='secondary' />
                            <span>Лента заказов</span>
                        </>
                    </HeaderButton>
                </div>
            </div>
            <Logo />
            <HeaderButton>
                <>
                    <ProfileIcon  type='secondary' />
                    <span>Личный кабинет</span>
                </>
            </HeaderButton>
        </header>
    )
}

export default AppHeader