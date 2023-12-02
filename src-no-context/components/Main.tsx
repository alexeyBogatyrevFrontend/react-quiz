import { FC, ReactNode } from 'react'

type MainProps = {
	children: ReactNode
}

const Main: FC<MainProps> = ({ children }) => {
	return <main className='main'>{children}</main>
}

export default Main
