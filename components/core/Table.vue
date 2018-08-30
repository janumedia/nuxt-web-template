<template>
    <table>
        <thead>
            <tr>
                <th v-for="(title, index) in headers" :key="index">{{ title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td v-for="(label, subIndex) in item" :key="subIndex">{{ label }}</td>
            </tr>
        </tbody>        
    </table>
</template>
<script>
export default {
    props: ["headers", "items"]
}
</script>
<style lang="scss" scoped>
table {
    border-collapse: collapse;
    width: 100%;
}
td, th {
    border: 1px solid #ccc;
    text-align: left;
    padding: 8px;
    text-align: center;
}
tr:nth-child(even) {
    background-color: #eee;
}
</style>

