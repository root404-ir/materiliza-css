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
        newUserInfo: {
            name: "",
            userName: "",
            email: "",
        },
        editUser: null,
        getUsers() {
            this.isLoading = true
            axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
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
        },
        handleSubmitAddUser() {
            this.isLoading = true
            axios.post('https://jsonplaceholder.typicode.com/users', this.newUserInfo).then((res) => {
                if (res.status === 201) {
                    this.mainUsers.push(this.newUserInfo)
                    this.showAddModal = false
                    this.handleResetForm()
                    this.pagination()
                    M.toast({ html: 'عملیات با موفقیت انجام شد', classes: 'rounded green' });
                }
            }).finally(() => {
                this.isLoading = false
            })
        },
        handleResetForm() {
            this.newUserInfo = {
                name: '',
                userName: '',
                email: ''
            }
        },
        handleDeleteItem(user) {
            var toastHTML = '<span>are you sure delete item (' + user.name + ') ?</span><button class="btn-flat toast-action" x-on:click="handleConfirmDelete(' + user.id + ')">Delete</button>';
            M.toast({ html: toastHTML });
        },
        handleConfirmDelete(user) {
            this.isLoading = true
            axios.delete("https://jsonplaceholder.typicode.com/users/" + user).then((res) => {
                if (res.status === 200) {
                    this.mainUsers = this.mainUsers.filter(user => user.id !== user)
                    this.users = this.users.filter(user => user.id !== user)
                    this.pagination()
                    M.toast({ html: 'عملیات با موفقیت انجام شد', classes: ' green' });
                }
            }).finally(() => {
                this.isLoading = false
            })
        },
        handleConfirmEditUser() {
            this.isLoading = true
            axios.put('https://jsonplaceholder.typicode.com/users/' + this.editUser, this.newUserInfo).then((res) => {
                if (res.status === 200) {
                    const userIndex = this.mainUsers.findIndex(user => user.id === this.editUser)
                    this.mainUsers[userIndex] = res.data
                    this.showAddModal = false
                    this.handleResetForm()
                    this.editUser = null
                    this.pagination()
                    M.toast({ html: 'کاربر با موفقیت بروزرسانی شد', classes: 'rounded green' });
                }
            }).finally(() => {
                this.isLoading = false
            })
        },
        handleUpdateUser(user) {
            console.log(user)
            this.newUserInfo = {
                name: user.name,
                userName: user.username,
                email: user.email,
            }
            this.editUser = user.id
            this.showAddModal = true
        }
    }))
})