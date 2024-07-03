const axios = require('axios');
const cheerio = require('cheerio');

async function fetchData() {
    try {
        const response = await axios.get('https://docs.qq.com/sheet/DU0d0ZGVRU3didm9R?tab=BB08J2');
        const $ = cheerio.load(response.data);

        // 假设表格是使用<table>标签，且我们关心的是第一个表格
        const table = $('table').first();

        // 获取所有<tr>元素，跳过前5行（即从第6行开始）
        const rows = table.find('tr').slice(5);

        // 假设A列是每行的第一个<td>元素
        const contentList = rows.map((index, row) => {
            const firstColumnText = $(row).find('td:first-child').text().trim();
            return firstColumnText;
        }).get(); // .get() 将jQuery对象转换为普通数组

        return contentList;
    } catch (error) {
        console.error(`Error fetching or parsing data: ${error}`);
    }
}

fetchData().then(data => {
    // console.log(data);
    // 可以在这里添加逻辑将data保存为JSON文件
    require('fs').writeFileSync('docs_qq_com_DU0d0ZGVRU3didm9R.json', JSON.stringify(data, null, 2));
});
