export const dataFormat = project => {
    const user = JSON.parse(window.sessionStorage.getItem('user'))
    const dataFormat = project.issue.flatMap(item => item.fields).flatMap(item => ({ ...item, created: item.created.slice(5, 7) }))
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const issueTypes = project.issueTypes
    const dict = {
        feature: issueTypes.filter(item => !item.includes('online') && !['代码错误', '界面错误', '数据问题'].includes(item)),
        online: issueTypes.filter(item => item.includes('online')),
        develop: ['代码错误', '界面错误', '数据问题']
    }
    const result = [
        { name: '新功能', key: 'feature' },
        { name: '线上bug', key: 'online' },
        { name: '开发bug', key: 'develop' },
    ]

    const series = result.flatMap(item => ({
        name: item.name,
        data: months.flatMap(month =>
            dataFormat.filter(data =>
                data.created === month &&
                data.assignee.displayName === user.name &&
                dict[item.key].includes(data.issuetype.name)).length)
    }))

    return series
}