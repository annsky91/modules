import { PageLayout } from '#/layouts/PageLayout'

const cx = cn('AboutPage', await import('./AboutPage.module.scss'))

export function Page(): ReactNode {
    return (
        <PageLayout>
            <div className={cx`AboutPage`}>
                <h1 className={cx`e:title`}>About</h1>
                <p className={cx`e:text`}>Example of using Sky.</p>
            </div>
        </PageLayout>
    )
}
