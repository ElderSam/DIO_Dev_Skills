const page1 = require("../../db/mock/DIO_labs/pages/page1.json");

module.exports = {
	listAll(req, res) {
		const getNewItem = (item) => {
			const { level, name, project_type, skills } = item;

			const newObj = {
				skills,
				name,
				project_type,
				level,
			};
			// console.log(newObj);
			return newObj;
		};

		const pageRes = page1.results;

		const projects = pageRes.map((project) => getNewItem(project));

		res.send({ projects });
	},
};
