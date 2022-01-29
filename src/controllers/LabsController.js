let project_types = [];
let arrSkills = [];
let levels = [];

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

		const getAllProjects = () => {
			let allProjects = [];

			for (let i = 1; i <= 13; i++) {
				const currentPage = require(`../../db/mock/DIO_labs/pages/page${i}.json`);

				const pageRes = currentPage.results;

				const projects = pageRes.map((project) => getNewItem(project));
				allProjects = [...allProjects, ...projects];
			}

			return allProjects;
		};

		const groupProjectsByProjectType = (resAllProjects) => {
			const project_types = [
				"Full-Stack",
				"Front-End",
				"Back-End",
				"Mobile"
			];
	
			const auxRes = {};
			project_types.map((type, index) => {
				array = resAllProjects.filter(item => item.project_type === type)
	
				// remote project_type from project
				array = array.map(item => {
					delete item.project_type
					return item
				})
				auxRes[project_types[index]] = array
			})

			return auxRes;
		}

		const resAllProjects = getAllProjects();

		const auxRes = groupProjectsByProjectType(resAllProjects);

		res.send({ projects: auxRes });
	},

	getLevelsAndSkills(req, res) {
		const setItemLevelsAndSkills = (item) => {
			const { level, project_type, skills } = item;

			project_types.push(project_type);
			arrSkills = [...arrSkills, ...skills];
			levels.push(level);
		};

		for (let i = 1; i <= 13; i++) {
			const currentPage = require(`../../db/mock/DIO_labs/pages/page${i}.json`);

			const pageRes = currentPage.results;

			pageRes.map((project) => setItemLevelsAndSkills(project));
		}

		arrSkills = [...new Set(arrSkills)].sort();
		levels = [...new Set(levels)];
		project_types = [...new Set(project_types)];

		res.send({ arrSkills, levels, project_types });
	},
};
