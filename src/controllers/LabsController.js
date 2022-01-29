module.exports = {
	listAll(req, res) {
		const getNewItem = (item) => {
			const { level, name, project_type, skills } = item;

			return {
				skills,
				name,
				project_type,
				level,
			};
		};

		let allProjects = [];

		for (let i = 1; i <= 13; i++) {
			const currentPage = require(`../../db/mock/DIO_labs/pages/page${i}.json`);

			const pageRes = currentPage.results;

			const projects = pageRes.map((project) => getNewItem(project));
			allProjects = [...allProjects, ...projects];
		}

		res.send({ projects: allProjects });
	},
};
