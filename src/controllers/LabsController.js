let project_types = [];
let arrSkills = [];
let levels = [];

const getAllLabs = () => {
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

	const groupProjectsByLevel = (projects) => {
		const levels = ["Intermediário", "Básico", "Avançado"];

		const res = {};

		levels.map((level, index) => {
			// para cada level
			const arrFilteredByLevel = projects.filter(
				(project) => project.level === level
			);

			// remove level from project
			const projectsByLevel = arrFilteredByLevel.map((item) => {
				delete item.level;
				return item;
			});

			res[levels[index]] = projectsByLevel;
		});

		return res;
	};

	const groupProjectsByProjectType = (resAllProjects) => {
		const project_types = ["Full-Stack", "Front-End", "Back-End", "Mobile"];

		const auxRes = {};
		project_types.map((type, index) => {
			projects = resAllProjects.filter(
				(item) => item.project_type === type
			);

			// remove project_type from project
			projects = projects.map((item) => {
				delete item.project_type;
				return item;
			});

			const projectsByLevel = groupProjectsByLevel(projects);

			auxRes[project_types[index]] = projectsByLevel;
		});

		return auxRes;
	};

	const resAllProjects = getAllProjects();

	return groupProjectsByProjectType(resAllProjects);
};

function listAll(req, res) {
	const auxRes = getAllLabs();
	res.send({ projects: auxRes });
}

function getLevelsAndSkills(req, res) {
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
}

module.exports = {
	listAll,
	getLevelsAndSkills,
};
