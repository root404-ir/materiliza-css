document.addEventListener('alpine:init', () => {
    Alpine.data('userData', () => ({
        mainUsers: [],
        users: [],
        pageUsers: [],
        isLoading: false,
        showAddModal: false,
        pageCount: 1,
        itemsCount: 4,
        currentPage: 1,
        searchChar: '',
        getUsers() {
            this.isLoading = true
            axios.get('./api/users.json').then((res) => {
                this.mainUsers = res.data
                this.users = res.data
                this.pagination()
            }).finally(() => {
                this.isLoading = false
            })
        },
        pagination() {
            this.pageCount = Math.ceil(this.users.length / this.itemsCount)
            let start = (this.currentPage * this.itemsCount) - this.itemsCount
            let end = this.currentPage * this.itemsCount
            this.pageUsers = this.users.slice(start, end)
        },
        nextPage() {
            this.currentPage++
            if (this.currentPage > this.pageCount) this.currentPage = this.pageCount
            this.pagination()
        },
        prevPage() {
            this.currentPage--
            if (this.currentPage < 1) this.currentPage = 1
            this.pagination()
        },
        handleChangeItemsCount(value) {
            this.currentPage = 1
            if (value < 1) this.itemsCount = 1
            if (value > this.users.length) this.itemsCount = this.users.length
        },
        handleSearch(value) {
            setTimeout(() => {
                this.users = this.mainUsers.filter(user => (user.name.includes(value) || user.username.includes(value) || user.email.includes(value)))
                this.currentPage = 1
                this.pagination()
            }, 100)
        }
    }))
})